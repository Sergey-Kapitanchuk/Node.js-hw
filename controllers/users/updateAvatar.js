const fs = require("fs/promises");
const path = require("path");
const Jimp = require('jimp');
const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars")


const updateAvatar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;

        const resize = await Jimp.read(tempUpload);
        await resize.cover(250, 250).writeAsync(tempUpload);

        const extension = originalname.split(".").pop();
        const newName = `${_id}.${extension}`;

        const resultUpload = path.join(avatarDir, newName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("avatars", newName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            "avatarURL": avatarURL
        })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
};

module.exports = updateAvatar;