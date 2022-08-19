exports.getOverview = (req, res) => {
  res.render('overview', {
    title: 'All tours',
  });
};

exports.getTour = (req, res) => {
  res.render('tour', {
    title: 'The forest Hiker Tour',
  });
};
