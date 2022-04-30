import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";

const PersonalInfo = () => {
  return (
    <>
      <div className="card-inner card-inner-lg">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">Personal Information</h4>
              <div className="nk-block-des">
                <p>
                  Basic info, like your name and address, that you use on Nio
                  Platform.
                </p>
              </div>
            </div>
            <div className="nk-block-head-content align-self-start d-lg-none">
              <a
                href="#"
                className="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
              >
                <em className="icon ni ni-menu-alt-r"></em>
              </a>
            </div>
          </div>
        </div>
        <div className="nk-block">
          <div className="nk-data data-list">
            <div className="data-head">
              <h6 className="overline-title">Basics</h6>
            </div>
            {/*  <div
              className="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
            >
              <div className="data-col">
                <span className="data-label">Full Name</span>
                <span className="data-value">Abu Bin Ishtiyak</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <em className="icon ni ni-forward-ios"></em>
                </span>
              </div>
            </div> */}
            <div
              className="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
            >
              <div className="data-col">
                <span className="data-label">Display Name</span>
                <span className="data-value">Ishtiyak</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <em className="icon ni ni-forward-ios"></em>
                </span>
              </div>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Email</span>
                <span className="data-value">info@softnio.com</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more disable">
                  <em className="icon ni ni-lock-alt"></em>
                </span>
              </div>
            </div>
            <div
              className="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
            >
              <div className="data-col">
                <span className="data-label">Phone Number</span>
                <span className="data-value text-soft">Not add yet</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <em className="icon ni ni-forward-ios"></em>
                </span>
              </div>
            </div>
            <div
              className="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
            >
              <div className="data-col">
                <span className="data-label">Date of Birth</span>
                <span className="data-value">29 Feb, 1986</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <em className="icon ni ni-forward-ios"></em>
                </span>
              </div>
            </div>
            {/*   <div
              className="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
              data-tab-target="#address"
            >
              <div className="data-col">
                <span className="data-label">Address</span>
                <span className="data-value">
                  2337 Kildeer Drive,
                  <br />
                  Kentucky, Canada
                </span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <em className="icon ni ni-forward-ios"></em>
                </span>
              </div>
            </div> */}
          </div>
         {/*  <div className="nk-data data-list">
            <div className="data-head">
              <h6 className="overline-title">Preferences</h6>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Language</span>
                <span className="data-value">English (United State)</span>
              </div>
              <div className="data-col data-col-end">
                <a href="#" className="link link-primary">
                  Change Language
                </a>
              </div>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Date Format</span>
                <span className="data-value">M d, YYYY</span>
              </div>
              <div className="data-col data-col-end">
                <a href="#" className="link link-primary">
                  Change
                </a>
              </div>
            </div>
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Timezone</span>
                <span className="data-value">Bangladesh (GMT +6)</span>
              </div>
              <div className="data-col data-col-end">
                <a href="#" className="link link-primary">
                  Change
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
