import React from 'react'
import DocUploadComp from '../../components/DocUploadComps/DocUploadComp';

const cusId = '65e761f4306956ed69fca1b2';
const docObj = {
    docname: "Pan",
    verifydoc: {
        name: false,
        dob: false,
        photo: false,
        address: false,
        check_permanent_address: false,
        own_house: false,
        rent_house: false,
        cross_check_aadhar_and_pand_dob: false,
        verify_father_mother_and_wife_name: false,
        verify_ph_no_link_with_aadhar: false
    },
    singleImg: false,
}

function TestPage() {

    //* Test CODE
    if (cusId === "" || cusId === null) {
        return (
            <h1>Plase provide a customer id</h1>
        )
    }
    //* TEST CODE END

    return (
        <DocUploadComp
            cusId={cusId}
            docObj={docObj}
        />
    )
}

export default TestPage