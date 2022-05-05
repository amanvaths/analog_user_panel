import React from 'react'

const ChangePassword = () => {
    return (
        <>

            <div class="col-lg-6">
                <div class="card card-bordered h-100">
                    <div class="card-inner">
                        <div class="card-head">
                            <h5 class="card-title">Contact Form</h5>
                        </div>
                        <form action="#">
                            <div class="form-group"><label class="form-label"
                                for="cf-full-name">Full Name</label>
                                <input type="text"
                                    class="form-control" id="cf-full-name"/></div>
                            <div class="form-group"><label class="form-label"
                                for="cf-email-address">Email address</label>
                                <input
                                    type="text" class="form-control" id="cf-email-address"/>
                            </div>
                            <div class="form-group"><label class="form-label"
                                for="cf-phone-no">Phone No</label>
                                <input type="text"
                                    class="form-control" id="cf-phone-no"/></div>
                            <div class="form-group"><label class="form-label"
                                for="cf-subject">Subject</label>
                                <input type="text"
                                    class="form-control" id="cf-subject"/></div>
                            <div class="form-group"><label class="form-label"
                                for="cf-default-textarea">Message</label>
                                <div class="form-control-wrap"><textarea
                                    class="form-control form-control-sm"
                                    id="cf-default-textarea"
                                    placeholder="Write your message"></textarea></div>
                            </div>
                            <div class="form-group"><button type="submit"
                                class="btn btn-lg btn-primary">Save
                                Informations</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;