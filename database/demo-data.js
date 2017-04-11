const generateDummyData = () => {
  let dummyData = [];
  let counter = 1;
  let industries = {Healthcare: false, Tech: false, Climat: false, Inclusion: false, 'Global Change': false};

  while (counter < 20) {
    counter++;
    let newUser = {
      email: `user${counter}@gmail.com`,
      password: `passwordUser${counter}`,
      role: { Donor: false, 'Non-Profit Organisation': true },
      industry: {Healthcare: false, Tech: false, Climat: false, Inclusion: false, 'Global Change': false},
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
    newUser.project.title = `${categoryName} project`;
    const basicDescription = `This is a randomly generate project part of the ${categoryName} category/ies.`;
    newUser.project.description = basicDescription + ' ' + basicDescription + ' ' + basicDescription + ' ' + basicDescription ;
  
    //Adding the newly created user to our pull of users
    dummyData.push(newUser);
  }
  return dummyData;
}

module.export = {
  generateDummyData
};

