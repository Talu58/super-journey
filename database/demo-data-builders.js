const generateDummyNonProfitData = () => {
  let dummyData = [];
  let counter = 1;
  let industries = {Healthcare: false, Tech: false, Climate: false, Inclusion: false, 'Global Change': false};

  while (counter <= 20) {
    counter++;
    let newUser = {
      firstname: `user${counter}`,
      lastname: `user${counter}`,
      email: `user${counter}@gmail.com`,
      password: `passwordUser${counter}`,
      role: { Donor: false, 'Non-Profit Organisation': true },
      industry: {Healthcare: false, Tech: false, Climate: false, Inclusion: false, 'Global Change': false},
      project: {title: '', description: ''},
    };

    //Randomly picking the industries for our user
    const indexOneIndustry = Math.floor(Math.random() * 5);
    const indexTwoIndustry = Math.floor(Math.random() * 5);
    const keyOneIndustry = Object.keys(newUser.industry)[indexOneIndustry];
    const keyTwoIndustry = Object.keys(newUser.industry)[indexTwoIndustry];
    newUser.industry[keyOneIndustry] = true;
    newUser.industry[keyTwoIndustry] = true;

    //Generating the content of the project
    const categoryName = keyOneIndustry === keyTwoIndustry ? `${keyOneIndustry}` : `${keyOneIndustry} and ${keyTwoIndustry}`;
    const category = keyOneIndustry === keyTwoIndustry ? 'category' : 'categories';
    newUser.project.title = `${categoryName} project`;
    const basicDescription = `This is a randomly generate project part of the ${categoryName} ${category}.`;
    let descriptionRepeatCounter = 1;
    while (descriptionRepeatCounter < 20) {
      newUser.project.description += basicDescription + ' ';
      descriptionRepeatCounter++;
    }
  
    //Adding the newly created user to our pull of users
    dummyData.push(newUser);
  }
  return dummyData;
};

const generateDummyDonorData = () => {
  const newUser = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'johndoepassword',
    role: { Donor: true, 'Non-Profit Organisation': false },
    industry: {Healthcare: false, Tech: false, Climate: false, Inclusion: false, 'Global Change': false},
  };

  //Randomly picking the industries for our user
  const indexOneIndustry = Math.floor(Math.random() * 5);
  const indexTwoIndustry = Math.floor(Math.random() * 5);
  const keyOneIndustry = Object.keys(newUser.industry)[indexOneIndustry];
  const keyTwoIndustry = Object.keys(newUser.industry)[indexTwoIndustry];
  newUser.industry[keyOneIndustry] = true;
  newUser.industry[keyTwoIndustry] = true;

  return newUser;
};

module.exports = {
  generateDummyNonProfitData,
  generateDummyDonorData
};

