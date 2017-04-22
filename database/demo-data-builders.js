const { createMessage } = require('../web-server/utils/utils-messaging');
let num;

const generateDummyNonProfitData = () => {
  num = Math.floor(Math.random() * 10000);
  let dummyData = [];
  let counter = 1;
  let industries = {Healthcare: false, Tech: false, Climate: false, Inclusion: false, 'Global Change': false};

  while (counter <= 20) {
    counter++;
    let newUser = {
      firstname: `user${counter}`,
      lastname: `user${counter}`,
      email: `user${counter}${num}@gmail.com`,
      password: `passwordUser${counter}`,
      role: { Donor: false, 'Non-Profit Organisation': true },
      industry: {Healthcare: false, Tech: false, Climate: false, Inclusion: false, 'Global Change': false},
      organization: {name: '', description: ''},
    };

    //Randomly picking the industries for our user
    const indexOneIndustry = Math.floor(Math.random() * 5);
    const indexTwoIndustry = Math.floor(Math.random() * 5);
    const keyOneIndustry = Object.keys(newUser.industry)[indexOneIndustry];
    const keyTwoIndustry = Object.keys(newUser.industry)[indexTwoIndustry];
    newUser.industry[keyOneIndustry] = true;
    newUser.industry[keyTwoIndustry] = true;

    //Generating the content of the organization
    const categoryName = keyOneIndustry === keyTwoIndustry ? `${keyOneIndustry}` : `${keyOneIndustry} and ${keyTwoIndustry}`;
    const category = keyOneIndustry === keyTwoIndustry ? 'category' : 'categories';
    newUser.organization.name = `${categoryName} organization`;
    const basicDescription = `This is a randomly generate organization part of the ${categoryName} ${category}.`;
    let descriptionRepeatCounter = 1;
    while (descriptionRepeatCounter < 20) {
      newUser.organization.description += basicDescription + ' ';
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
    email: `johndoe${num}@gmail.com`,
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

const generateNewThread = () => {
  const donor = {
    firstname: 'John',
    email: `johndoe${num}@gmail.com`,
  };

  const user = {
    firstname: 'user10',
    email: `user10${num}@gmail.com`,
  };

  const messages = [
      {
        from: donor.firstname,
        to: user.firstname,
        message: "Hi, I am interested in your Organization, could we set up a call?",
        time: new Date()
      },
      {
        from: user.firstname,
        to: donor.firstname,
        message: "Sure, how about tomorrow at 3pm?",
        time: new Date()
      },
      {
        from: donor.firstname,
        to: user.firstname,
        message: "Perfect! you can call me at 760-557-9837",
        time: new Date()
      },
      {
        from: user.firstname,
        to: donor.firstname,
        message: "Great, looking forward to speaking with you! You have a great day.",
        time: new Date()
      },
      {
        from: donor.firstname,
        to: user.firstname,
        message: "Thanks, you too!!",
        time: new Date()
      },
    ];

  const newThread = {
    threadName: user.email + '-' + donor.email,
    nameUserOne: user.firstname,
    nameUserTwo: donor.firstname,
    messages: [],
    recipientEmail: user.email,
    senderEmail: donor.email
  };

  messages.forEach(message => {
    const newMessage = createMessage(message);
    newThread.messages.push(newMessage);
  });

  return newThread;
};

module.exports = {
  generateDummyNonProfitData,
  generateDummyDonorData,
  generateNewThread
};

