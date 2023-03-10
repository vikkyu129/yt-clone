import User from "../models/User.js";

export function like() {}

export function unsubscribe() {}

export function subscribe() {}

export function getUser() {}

export function deleteUser() {}

export function dislike() {}

export async function update(req, res, next) {
  const currUserId = req.params.id;
  if (currUserId === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      currUserId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    res.send(403).status("restricted operation");
  }
}
