import Video from "../models/Video.js";
import User from "../models/User.js";

export async function sub(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function rand(req, res, next) {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    if (videos) {
      return res.status(200).json(videos);
    } else {
      return res.status(403).send("Video not Found");
    }
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function trend(req, res, next) {
  try {
    const videos = await Video.find().sort({ views: -1 });
    if (videos) {
      return res.status(200).json(videos);
    } else {
      return res.status(403).send("Video not Found");
    }
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function tags(req, res, next) {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } })
      .sort({
        views: -1,
      })
      .limit(20);
    if (videos) {
      return res.status(200).json(videos);
    } else {
      return res.status(403).send("Video not Found");
    }
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function search(req, res, next) {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    if (videos) {
      return res.status(200).json(videos);
    } else {
      return res.status(403).send("Video not Found");
    }
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function addView(req, res, next) {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.status(200).send("The View has been increased");
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function addVideo(req, res, next) {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).send("Video Saved");
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function updateVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      if (req.user.id === video.userId) {
        const updatedVideo = await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedVideo);
      } else {
        return res.status(403).send("Restricted Operation");
      }
    } else {
      return res.status(403).send("Video not Found");
    }
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function deleteVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      if (req.user.id === video.userId) {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).send("Video is deleted");
      } else {
        return res.status(403).send("Restricted Operation");
      }
    } else {
      return res.status(403).send("Video not Found");
    }
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function getVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      return res.status(200).json(video);
    } else {
      return res.status(403).send("Video not Found");
    }
  } catch (e) {
    res.status(403).send(e);
  }
}
