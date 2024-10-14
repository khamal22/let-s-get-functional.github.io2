// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('underbar');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./let-s-get-functional.github.io2/projects/let-s-get-functional
 *
 *    IMPORTANT: Make sure you replace <YOUR_GITHUB_FOLDER with your actual github folder name that is in your workspace.
 */

var maleCount = function(array) {
     let males = _.filter(array, function(customer){
        return customer.gender === 'male'
     });
     return males.length;
     console.log(males)
};

var femaleCount = function(){
   return customers.reduce((count, customer) => {
      // Check if the customer is female and increment the count accordingly
      return customer.gender === 'female' ? count + 1 : count;
  }, 0); // Initialize count to 0

};





var oldestCustomer = function(array){
     let oldest = _.reduce(array, function(accumulator, current){
        if(current.age > accumulator.age){
            return current
        }
        return accumulator
     }

     )
    return oldest.name
    }


var youngestCustomer = function(customers){
  // Initialize the youngest customer as the first element of the array
  let youngest = customers[0];

  // Traverse through the array to find the youngest customer
  for (let i = 1; i < customers.length; i++) {
    if (customers[i].age < youngest.age) {
      youngest = customers[i];
    }
  }

  // Return the name of the youngest customer
  return youngest.name
}

var averageBalance = function(users){
    if (!Array.isArray(users)) {
        throw new TypeError('Expected an array as the first argument.');
    }
    
    // Calculate the total balance
    const totalBalance = users.reduce((accumulator, user) => {
        // Remove dollar sign and commas, then convert to float
        const balance = parseFloat(user.balance.replace(/[$,]/g, ''));
        return accumulator + balance;
    }, 0);
    
    // Calculate the average balance
    const average = totalBalance / users.length;
    
    return average;
}

var firstLetterCount = function(users, letter){
    if (!Array.isArray(users)) {
        throw new TypeError('Expected an array as the first argument.');
    }
    if (typeof letter !== 'string' || letter.length !== 1) {
        throw new TypeError('Expected a single character as the second argument.');
    }
    
    // Convert letter to lowercase for case-insensitive comparison
    const lowerCaseLetter = letter.toLowerCase();
    
    // Count how many names start with the given letter
    const count = users.reduce((accumulator, user) => {
        // Check if the name starts with the specified letter
        if (user.name.toLowerCase().startsWith(lowerCaseLetter)) {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);
    
    return count;
}

var friendFirstLetterCount = function(customersData, customerName, letter){
    let customer;
    let count = 0; // Initialize count to 0

    // Convert the letter to lowercase to make the comparison case-insensitive
    letter = letter.toLowerCase();

    for (var i = 0; i < customersData.length; i++) {
        if (customersData[i].name === customerName) {
            customer = customersData[i]; // Found the customer
            for (var j = 0; j < customer.friends.length; j++) {
                // Check if the friend's name starts with the given letter (case-insensitive)
                if (customer.friends[j].name[0].toLowerCase() === letter) {
                    count++; // Increment the count if the condition is met
                }
            }
        }
    }
    
    return count; // Return the count of friends whose names start with the letter
};
    
    


var friendsCount = function(users, name){
   // Validate the input types
   if (!Array.isArray(users)) {
    throw new TypeError('Expected an array as the first argument.');
  }

  // If name is undefined or not a string, return an empty array
  if (typeof name !== 'string') {
    console.log('Invalid type for name:', name); // Log the value of name for debugging
    return [];
  }

  // Convert name to lowercase for case-insensitive comparison
  const lowerCaseName = name.toLowerCase();

  // Filter the users to find those whose friends list includes the given name
  const friends = users.filter(user => {
    // Check if the user has a valid friends array
    if (!Array.isArray(user.friends)) {
      console.warn(`User ${user.name} has an invalid or missing friends list.`);
      return false;
    }
    return user.friends.some(friend => friend.name.toLowerCase() === lowerCaseName);
  });

  // Return the array of user names whose friends include the given name
  return friends.map(user => user.name);
}

var topThreeTags = function(customers){
 // Initialize a tag frequency object to count occurrences of each tag
 const tagCount = {};

 // Iterate over each customer and their tags
 customers.forEach(customer => {
     if (customer.tags) {
         customer.tags.forEach(tag => {
             // Increment the tag count for the current tag
             tagCount[tag] = (tagCount[tag] || 0) + 1;
         });
     }
 });

 // Convert the tagCount object into an array of [tag, count] pairs and sort by count in descending order
 const sortedTags = Object.entries(tagCount)
                          .sort((a, b) => b[1] - a[1]);

 // Extract the top three tags (or fewer if there are less than three)
 return sortedTags.slice(0, 3).map(tag => tag[0]);
}

var genderCount = function(users){
  // Validate the input type
  if (!Array.isArray(users)) {
    throw new TypeError('Expected an array as the first argument.');
}

// Use reduce to summarize the counts of genders
return users.reduce((acc, user) => {
    // Check the gender and increment the corresponding count
    const gender = user.gender.toLowerCase(); // Normalize to lowercase for consistent keys
    if (!acc[gender]) {
        acc[gender] = 0; // Initialize the count if it doesn't exist
    }
    acc[gender] += 1; // Increment the count
    return acc; // Return the accumulator for the next iteration
}, {}); // Initialize with an empty object

}

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;
