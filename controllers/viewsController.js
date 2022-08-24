const Tour = require('../models/tourModel');
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
