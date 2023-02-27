const Contact = require("../Models/Contact")

exports.addContact=async(req,res)=>{
    try {
        const found = await Contact.findOne({email : req.body.email})
        
        if(found){
            return res.status(400).send("Email exists")
        }
        const newContact = new Contact(req.body)

        await newContact.save()

        res.status(200).send({msg : "Contact Added", newContact})
    } catch (error) {
        res.status(500).send({msg : "Could not add contact"})
    }
}

exports.getAllContacts=async(req,res)=>{
    try {
        const contacts = await Contact.find()

        res.status(200).send({msg : "List of contacts",contacts})
    } catch (error) {
        res.status(500).send({msg : "Could not get contacts"}) 
    }
}

exports.getOneContact=async(req,res)=>{
    try {
        const {id} = req.params

        const contact = await Contact.findById(id)

        res.status(200).send({msg : "Contact found",contact})
    } catch (error) {
        res.status(500).send({msg : "Could not get contact"}) 
    }
}

exports.deleteContact=async(req,res)=>{
    try {
        const {id} = req.params

        await Contact.findByIdAndDelete(id)

        res.status(200).send({msg : "Contact deleted"})
    } catch (error) {
        res.status(500).send({msg : "Could not delete contact"}) 
    }
}

exports.updateContact=async(req,res)=>{
    try {
        const {id} = req.params

        await Contact.findByIdAndUpdate(id,{$set : req.body})

        // const contacts = await Contact.find()

        res.status(200).send({msg : "Contact updated"})
    } catch (error) {
        res.status(500).send({msg : "Could not update contact"}) 
    }
}