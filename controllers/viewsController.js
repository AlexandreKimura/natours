const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const { catchAsync } = require('../utils/catchAsync');

exports.alerts = (req, res, next) => {
  const { alert } = req.query

  if(alert === 'booking') {
    res.locals.alert = 'Tour booking was successful!'
  }

  next()
}

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

exports.getMyTour = catchAsync (async (req, res, next) => {

  const bookings = await Booking.find({
    user: req.user.id
  })

  const tourIDs = bookings.map(b => b.tour)
  const tours = await Tour.find({ _id: {$in: tourIDs}})

  res.render('overview', {
    title: 'My Tours',
    tours
  })
})
