

module.exports.getIndustryMatchesRequest = (req, res) => {
  console.log('req.params.industry', req.params.industry);
  return res.send({
            matches: 'helo'
          });
}