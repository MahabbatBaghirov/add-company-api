const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require('crypto');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 7070;
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

app.get("/api", (req, res) => {
  res.send("welcome to our API!");
});

//ARTISTS CRUD
//GET ALL ARTISTS
app.get("/api/company", (req, res) => {
  const { companyName } = req.query;
  if (!companyName) {
    res.status(200).send(COMPANY);
  } else {
    res
      .status(200)
      .send(
        COMPANY.filter((x) =>
          x.companyName.toLowerCase().trim().includes(companyName.toLowerCase().trim())
        )
      );
  }
});
//GET ARTIST BY ID
app.get('/api/company/:id',(req,res)=>{
    const{id} = req.params;
    res.status(200).send(COMPANY.find((x)=>x.id==id))
})
//DELETE ARTIST
app.delete('/api/company/:id',(req,res)=>{
    const id = req.params.id;
    //delete
    const deleteCompany = COMPANY.find((x)=>x.id==id);
    const idx = COMPANY.indexOf(deleteArtist);
    COMPANY.splice(idx,1);
    res.status(203).send({
        message: `${deleteCompany.name} deleted successfully!`
    })
})
//POST ARTIST
app.post('/api/company',(req,res)=>{
    const{companyName,contactName,contactTitle} = req.body;
    const newCompany = {
        id: crypto.randomUUID(),
        companyName: companyName,
        contactName: contactName,
        contactTitle: contactTitle,
    }
    COMPANY.push(newCompany);

    res.status(201).send({
        message: `${newCompany.name} posted successfully`,
        payload: newCompany
    })
})
//EDIT ARTIST
app.put('/api/company/:id',(req,res)=>{
    const id = req.params.id;
    const updatingCompany = COMPANY.find((x)=>x.id==id);
    const{companyName,contactName,contactTitle} = req.body;
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
