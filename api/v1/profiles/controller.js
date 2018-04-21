const User = require('../../../models/User');
const Profile = require('../../../models/Profile');

/**
 * @api {get} /profile
 *
 * @apiName GET Current Profile
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} Returns User Profile
 *
 * @apiError (404) {String} message Not Found
 *
 * @apiError (500) {String} Internal Server error
 */

exports.find = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json('Not Found')
            }
            res.json(profile);
        })
        .catch(err => res.status(500).json(err));
};

/**
 * @api {post} /profile/create
 *
 * @apiName POST Create Profile
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} Creates a Profile
 *
 * @apiError (400) {String} message Validation Error
 *
 * @apiError (500) {String} Internal Server error
 */

exports.create = (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;
    // Skills - Split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
            //  Create Profile - Check
                Profile.findOne({ handle: profileFields })
                    .then(profile => {
                        if (profile) {
                            res.status(400).json('Validation Error: That handle already exists')
                        }
                        // Save Profile
                        new Profile(profileFields)
                            .save()
                            .then(profile => res.json(profile));
                    })
            }
        });


};