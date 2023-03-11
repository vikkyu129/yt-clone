import User from "../models/User.js";
import Video from "../models/Video.js";

export async function unsubscribe(req, res, next) {
  console.log("unsub");
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).send("Unsubscription Successful");
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function subscribe(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).send("Subscription Successful");
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function getUser(req, res, next) {
  try {
    const foundUser = await User.findById(req.user.id);
    res.status(200).json(foundUser);
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function deleteUser(req, res, next) {
  const currUserId = req.params.id;
  if (currUserId === req.user.id) {
    try {
      await User.findByIdAndDelete(currUserId);
    } catch (e) {
      res.status(403).send(e);
    }
  } else {
    res.send(403).status("Restricted Operation");
  }
}

export async function update(req, res, next) {
  const currUserId = req.params.id;
  if (currUserId === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        currUserId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.send(403).status("Restricted Operation");
  }
}

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    res.status(403).send(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    res.status(403).send(err);
  }
};
