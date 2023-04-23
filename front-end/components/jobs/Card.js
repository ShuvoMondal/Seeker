import React from 'react'

const Card = () => {
  return (
    <>
        <style>
            {`

                    .card {
                        border: none;
                        border-radius: 10px
                    }

                    .c-details span {
                        font-weight: 300;
                        font-size: 13px
                    }

                    .icon {
                        width: 50px;
                        height: 50px;
                        background-color: #eee;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 39px
                    }

                    .badge span {
                        background-color: #fffbec;
                        width: 60px;
                        height: 25px;
                        padding-bottom: 3px;
                        border-radius: 5px;
                        display: flex;
                        color: #fed85d;
                        justify-content: center;
                        align-items: center
                    }

                    .progress {
                        height: 10px;
                        border-radius: 10px
                    }

                    .progress div {
                        background-color: red
                    }

                    .text1 {
                        font-size: 14px;
                        font-weight: 600
                    }

                    .text2 {
                        color: #a5aec0
                    }
            `}
        </style>
        <div className="container mt-5 mb-3">
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 mb-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="icon"> <i className="bx bxl-mailchimp"></i> </div>
                                <div className="ms-2 c-details">
                                    <h6 className="mb-0">Mailchimp</h6> <span>1 days ago</span>
                                </div>
                            </div>
                            <div className="badge"> <span>Design</span> </div>
                        </div>
                        <div className="mt-5">
                            <h3 className="heading">Senior Product <br/> Designer-Singapore</h3>
                            <div className="mt-5">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="mt-3"> <span className="text1">32 Applied <span className="text2">of 50 capacity</span></span> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 mb-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="icon"> <i className="bx bxl-dribbble"></i> </div>
                                <div className="ms-2 c-details">
                                    <h6 className="mb-0">Dribbble</h6> <span>4 days ago</span>
                                </div>
                            </div>
                            <div className="badge"> <span>Product</span> </div>
                        </div>
                        <div className="mt-5">
                            <h3 className="heading">Junior Product<br/>Designer-Singapore</h3>
                            <div className="mt-5">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="mt-3"> <span className="text1">42 Applied <span className="text2">of 70 capacity</span></span> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 mb-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="icon"> <i className="bx bxl-reddit"></i> </div>
                                <div className="ms-2 c-details">
                                    <h6 className="mb-0">Reddit</h6> <span>2 days ago</span>
                                </div>
                            </div>
                            <div className="badge"> <span>Design</span> </div>
                        </div>
                        <div className="mt-5">
                            <h3 className="heading">Software Architect <br/>Java - USA</h3>
                            <div className="mt-5">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="mt-3"> <span className="text1">52 Applied <span className="text2">of 100 capacity</span></span> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card