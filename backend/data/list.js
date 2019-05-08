const faker = require('faker');
faker.locale = "zh_CN";

function generateCustomers () {
    var customers = []
    for (var id = 0; id < 50; id++) {
      var name = faker.name.firstName() + faker.name.lastName()
      var job = faker.name.jobTitle()
      var phone = faker.phone.phoneNumber()
      var address = faker.address.streetName()
      customers.push({
        id,
        name,
        job,
        address,
        phone
      })
    }
    return { "customers": customers }
}
module.exports = generateCustomers