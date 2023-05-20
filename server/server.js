const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require('crypto');
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 7070;
const pass = "mehebbet123"
const link = `mongodb+srv://mehebbet:${pass}@cluster0.vglcwjt.mongodb.net/?retryWrites=true&w=majority`

const COMPANY = [
  {
    id: 1,
    companyName: "Steve Lacy",
    contactName: "Alo",
    contactTitle: "sfs"
  },
  {
    id: 2,
    companyName: "Kenny West",
    contactName: "salam",
    contactTitle: "error"
  },
  {
    id: 3,
    companyName: "Jonny",
    contactName: "sagol",
    contactTitle: "ale"
  },
  {
    id: 4,
    companyName: "Steve Lacy",
    contactName: "Alo",
    contactTitle: "Error"
  }
];



const CompanySchema = new mongoose.Schema({
  companyName: String,
  contactName: String,
  contactTitle: String
});
const Companies = new mongoose.model("Compani",CompanySchema);




app.get("/api", (req, res) => {
  res.send("welcome to our API!");
});

//ARTISTS CRUD
//GET ALL ARTISTS
app.get("/api/company", async(req, res) => {
  const { companyName } = req.query;
  const company = await Companies.find();
  if (!companyName) {
    res.status(200).send(company);
  } else {
    res
      .status(200)
      .send(
        company.filter((x) =>
          x.companyName.toLowerCase().trim().includes(companyName.toLowerCase().trim())
        )
      );
  }
});

//GET ARTIST BY ID
app.get('/api/company/:id', async(req,res)=>{
    const{id} = req.params;
    const company = await Companies.findById(id)
    res.status(200).send(company)
})

//DELETE ARTIST
app.delete('/api/company/:id',async(req,res)=>{
    const id = req.params.id;
    const deleteCompany = await Companies.findByIdAndDelete(id);
    res.status(203).send({
        message: `${deleteCompany.companyName} deleted successfully!`
    })
})
//POST ARTIST
app.post('/api/company',async(req,res)=>{
    const{companyName,contactName,contactTitle} = req.body;
    const newComp = new Companies ({
      id: crypto.randomUUID(),
      companyName: companyName,
      contactName: contactName,
      contactTitle: contactTitle,
  });
  await newComp.save();

    res.status(201).send({
        message: `${newComp.companyName} posted successfully`,
        payload: newComp
    })
})
//EDIT ARTIST
app.put('/api/company/:id',async(req,res)=>{
    const id = req.params.id;
    const{companyName,contactName,contactTitle} = req.body;
    const updatingCompany = {companyName:companyName,contactName:contactName,contactTitle:contactTitle};
    await Companies.findByIdAndUpdate(id,updatingCompany);
    if (companyName) {
        updatingCompany.companyName = companyName;
    }
    if (contactTitle) {
        updatingCompany.contactTitle = contactTitle;
    }
    if (contactName) {
        updatingCompany.contactName = contactName;
    }
    res.status(200).send(`${updatingCompany.companyName} updated successfully!`)
})
 
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});


mongoose.connect(link.replace("<password>",pass)).then(() => {
  console.log("Mongo DB connected!");
});