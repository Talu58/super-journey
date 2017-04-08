

module.exports.getIndustryMatchesRequest = (req, res) => {
  console.log(req.params);
  return res.send({
            matches: 'helo'
          });
}