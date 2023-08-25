const CS = "mongodb+srv://diazhernan:2qgupJ6CgDngwVJy@cluster0.wnccsmk.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const { company } = require('../../models/company');


( async () => {
    try {
        const connection = await mongoose.connect(CS);
        await mongoose.connect(CS);

        const response = await company.deleteMany();
        console.log(response);
        process.exit(0);
    } catch (e) {
        console.log("Rompido!: ", e);
    }
})();