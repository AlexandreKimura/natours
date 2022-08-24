const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const { catchAsync } = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  // if (!tour) {
  //   return next(new AppError('There is no tour with that name.', 404));
  // }

  res.render('tour', {
    title: `${tour.name} tour`,
    tour,
  });
});

exports.login = (req, res, next) => {
  res.render('login', {
    title: `Log into your account`,
  });
};

exports.getAccount = (req, res) => {
  res.render('account', {
    title: 'Your account',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  console.log(name, email);

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
