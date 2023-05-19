import * as Yup from 'yup';

export const CompanySchema = Yup.object().shape({
    companyName: Yup.string().required("company name is required"),
    contactName: Yup.string().required("contact name is required"),
    contactTitle: Yup.string().required("title is required")
})