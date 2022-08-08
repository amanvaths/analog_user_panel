import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/ClockStyle.css";
import axios from "axios";
import $ from 'jquery'

const RoadMap = () => {

  useEffect(() => {


    $(function () { function injector(t, splitter, klass, after) { var a = t.text().split(splitter), inject = ''; if (a.length) { $(a).each(function (i, item) { inject += '<span className="' + klass + (i + 1) + '">' + item + '</span>' + after }); t.empty().append(inject) } } var methods = { init: function () { return this.each(function () { injector($(this), '', 'char', '') }) }, words: function () { return this.each(function () { injector($(this), ' ', 'word', ' ') }) }, lines: function () { return this.each(function () { var r = "eefec303079ad17405c889e092e105b0"; injector($(this).children("br").replaceWith(r).end(), r, 'line', '') }) } }; $.fn.lettering = function (method) { if (method && methods[method]) { return methods[method].apply(this, [].slice.call(arguments, 1)) } else if (method === 'letters' || !method) { return methods.init.apply(this, [].slice.call(arguments, 0)) } $.error('Method ' + method + ' does not exist on jQuery.lettering'); return this } });

    $(function () {

      var date, dayName, day, month, year;
      var range = 270,
        sectionsDayName = 7,
        sectionsDay = 31,
        sectionsMonth = 12,
        charactersDayName = 3,
        charactersDay = 2,
        charactersMonth = 3,
        dayColor = '#D8F700',
        monthColor = '#D8F700',
        dayNameColor = '#D8F700';


      // Rotate the selected ring the correct amount and illuminate the correct characters of the ring text
      function rotateRing(input, sections, characters, ring, text, color) {
        var sectionWidth = range / sections;
        var initialRotation = 135 - sectionWidth / 2;
        var rotateAmount = initialRotation - sectionWidth * (input - 1);
        var start = characters * (input - 1) + (input - 1) + 1;

        $(ring).css({
          '-webkit-transform': 'rotate(' + rotateAmount + 'deg)',
          '-moz-transform': 'rotate(' + rotateAmount + 'deg)',
          '-ms-transform': 'rotate(' + rotateAmount + 'deg)',
          'transform': 'rotate(' + rotateAmount + 'deg)'
        });


        for (var i = start; i < start + characters; i++) {
          $(text).children('.char' + i).css({
            'color': color
          });

        }
      }

      // Get a new date object every second and update the rotation of the clock handles
      function clockRotation() {
        setInterval(function () {
          var date = new Date();
          var seconds = date.getSeconds();
          var minutes = date.getMinutes();
          var hours = date.getHours();
          var secondsRotation = seconds * 6;
          var minutesRotation = minutes * 6;
          var hoursRotation = hours * 30 + minutes / 2;
          $("#seconds").css({
            '-webkit-transform': 'rotate(' + secondsRotation + 'deg)',
            '-moz-transform': 'rotate(' + secondsRotation + 'deg)',
            '-ms-transform': 'rotate(' + secondsRotation + 'deg)',
            'transform': 'rotate(' + secondsRotation + 'deg)'
          });

          $("#minutes").css({
            '-webkit-transform': 'rotate(' + minutesRotation + 'deg)',
            '-moz-transform': 'rotate(' + minutesRotation + 'deg)',
            '-ms-transform': 'rotate(' + minutesRotation + 'deg)',
            'transform': 'rotate(' + minutesRotation + 'deg)'
          });

          $("#hours").css({
            '-webkit-transform': 'rotate(' + hoursRotation + 'deg)',
            '-moz-transform': 'rotate(' + hoursRotation + 'deg)',
            '-ms-transform': 'rotate(' + hoursRotation + 'deg)',
            'transform': 'rotate(' + hoursRotation + 'deg)'
          });

        }, 1000);
      }

      // Give column representing passed days and the current day this week a height
      function loadBars() {
        for (var i = 1; i <= dayName; i++) {
          var newHeight = Math.floor(Math.random() * 85) + 5;
          var newTop = 110 - newHeight;
          $("#x" + i).css({
            'height': newHeight + 'px'
          });

        }
      }

      function init() {
        $(".center-preview").lettering();
        $(".day-name-preview").lettering();
        $(".day-name-text").lettering();
        $(".day-preview").lettering();
        $(".day-text").lettering();
        $(".month-preview").lettering();
        $(".month-text").lettering();
        $('.day-preview').fadeTo(10, 1);
        $('.month-preview').fadeTo(10, 1);
        $('.day-name-preview').fadeTo(10, 1);
        $('.center-preview').fadeTo(10, 1);

        // Get date variables
        date = new Date();
        dayName = date.getDay(); // Day of week (1-7)
        day = date.getDate(); // Get current date (1-31)
        month = date.getMonth() + 1; // Current month (1-12)
        if (dayName == 0) {
          dayName = 7;
        }
        // Fade in/out second dial and rotate. Also fade in and animate side elements.
        setTimeout(function () {
          $('.day-preview').fadeTo(500, 0);
          $('.day-text').fadeTo(500, 1, function () {
            rotateRing(day, sectionsDay, charactersDay, '#r3', '.day-text', dayColor);
          });
        }, 500);

        // Fade in/out second dial and rotate. Also fade in and animate side elements.
        setTimeout(function () {
          $('.month-preview').fadeTo(500, 0);
          $('.fa-cloud').fadeTo(500, 1);
          $('.temperature').fadeTo(500, 1);
          $('.bars').fadeTo(500, 1);
          $('.month-text').fadeTo(500, 1, function () {
            rotateRing(month, sectionsMonth, charactersMonth, '#r2', '.month-text', monthColor);
            loadBars();
          });
        }, 1000);

        // Fade in/out first dial and rotate
        setTimeout(function () {
          $('.day-name-preview').fadeTo(500, 0);
          $('.day-name-text').fadeTo(500, 1, function () {
            rotateRing(dayName, sectionsDayName, charactersDayName, '#r1', '.day-name-text', dayNameColor);
          });
        }, 1500);

        // Fade in/out center dial
        setTimeout(function () {
          $('.center-preview').fadeTo(500, 0);
          $('.head').fadeTo(500, 0);
          $('.torso').fadeTo(500, 0);
          $(".hand-container").fadeTo(500, 1, function () {
            //console.log("Clock faded in");
          });
        }, 2000);

        // Begin clock rotation now it is visible
        clockRotation();
      }

      init();
    });
  }, [])

  // function openCity(evt, cityName) {
  //   var i, tabcontent, tablinks;
  //   tabcontent = document.getElementsByClassName("tabcontent");
  //   for (i = 0; i < tabcontent.length; i++) {
  //     tabcontent[i].style.display = "none";
  //   }

  //   tablinks = document.getElementsByClassName("tablinks");
  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].className = tablinks[i].className.replace("active", "");
  //   }

  //   document.getElementById(cityName).style.display = "block";
  //   evt.currentTarget.className += " active";
  // }


  return (
    <div className="nk-app-root">
      <div className="nk-main">
        <Menu />
        <div className="nk-wrap">
          <Header />
          <div className="nk-content nk-content-fluid bg-light min-height ">
            <div className="container-xl">
              <div className="nk-content-body">
                <div className="nk-block-head nk-block-head-lg text-center">
                  <div className="nk-block-head-content">
                    <h4 className="nk-block-title fw-normal">Roadmap</h4>
                    <div className="nk-block-des">
                      <p>A Complete Roadmap to Blockchain Development</p>
                    </div>
                  </div>
                </div>

                <div className="clockdate">
                  <div className='center-dial'>
                    <h1 className='center-preview'></h1>
                    <div className='head'></div>
                    <div className='torso'></div>
                    <div className='hand-container' id='minutes'>
                      <div className='minute-hand'></div>
                    </div>
                    <div className='hand-container' id='hours'>
                      <div className='hour-hand'></div>
                    </div>
                    <div className='hand-container' id='seconds'>
                      <div className='second-hand'></div>
                    </div>
                  </div>
                  <div className='day-name-dial'>
                    <div className='ring-back'></div>
                    <div className='ring' id='r1'>
                      {/* <h1 className='day-name-preview'>DAY NAME</h1> */}
                      <h2 className='day-name-text'>MON TUE WED THU FRI SAT SUN</h2>
                    </div>
                  </div>
                  <div className='month-dial'>
                    <div className='ring-back'></div>
                    <div className='ring' id='r2'>
                      {/* <h1 className='month-preview'>MONTH</h1> */}
                      <h2 className='month-text'>JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC</h2>
                    </div>
                  </div>
                  <div className='day-dial'>
                    <div className='ring-back'></div>
                    <div className='ring' id='r3'>
                      {/* <h1 className='day-preview'>DAY</h1> */}
                      <h2 className='day-text'>01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31</h2>
                    </div>
                  </div>
                </div>

                <div className="tab_content_div">
                  <div className="card-inner">
                    <ul className="nav nav-tabs nav-tabs-s2 mt-n2 border-bottom-0">
                      <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tabItem9">07 July 2022</a></li>
                      <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tabItem10">Data one</a></li>
                      <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tabItem11">Data two</a>
                      </li>
                      <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tabItem12">Data Three</a></li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane" id="tabItem9">
                        <div className="row">
                          <div className="col-md-6 col-xxl-4">
                            <div className="card card-bordered card-full">
                              <div className="card-inner">
                                <div className="card-title-group mb-1">
                                  <div className="card-title">
                                    <h6 className="title">Investment Overview</h6>
                                    <p>The investment overview of your platform. <a href="#">All Investment</a></p>
                                  </div>
                                </div>
                                <div className="invest-ov gy-2">
                                  <div className="subtitle">Currently Actived Investment</div>
                                  <div className="invest-ov-details">
                                    <div className="invest-ov-info">
                                      <div className="amount">49,395.395 <span className="currency currency-usd">USD</span></div>
                                      <div className="title">Amount</div>
                                    </div>
                                    <div className="invest-ov-stats">
                                      <div><span className="amount">56</span><span className="change up text-danger"><em
                                        className="icon ni ni-arrow-long-up"></em>1.93%</span></div>
                                      <div className="title">Plans</div>
                                    </div>
                                  </div>
                                  <div className="invest-ov-details">
                                    <div className="invest-ov-info">
                                      <div className="amount">49,395.395 <span className="currency currency-usd">USD</span></div>
                                      <div className="title">Paid Profit</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="invest-ov gy-2">
                                  <div className="subtitle">Investment in this Month</div>
                                  <div className="invest-ov-details">
                                    <div className="invest-ov-info">
                                      <div className="amount">49,395.395 <span className="currency currency-usd">USD</span></div>
                                      <div className="title">Amount</div>
                                    </div>
                                    <div className="invest-ov-stats">
                                      <div><span className="amount">23</span><span className="change down text-danger"><em
                                        className="icon ni ni-arrow-long-down"></em>1.93%</span></div>
                                      <div className="title">Plans</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-xxl-8">
                            <div className="card card-bordered card-full">
                              <table className="table table-tranx">
                                <thead>
                                  <tr className="tb-tnx-head">
                                    <th className="tb-tnx-id"><span className="">#</span></th>
                                    <th className="tb-tnx-info"><span className="tb-tnx-desc d-none d-sm-inline-block"><span>Bill
                                      For</span></span><span className="tb-tnx-date d-md-inline-block d-none"><span
                                        className="d-md-none">Date</span><span className="d-none d-md-block"><span>Issue
                                          Date</span><span>Due Date</span></span></span></th>
                                    <th className="tb-tnx-amount"><span className="tb-tnx-total">Total</span><span
                                      className="tb-tnx-status d-none d-md-inline-block">Status</span></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4947</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Enterprize Year Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">10-05-2019</span><span className="date">10-13-2019</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$599.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-warning">Due</span></div>
                                    </td>
                                  </tr>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4904</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Maintenance Year Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">06-19-2019</span><span className="date">06-26-2019</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$99.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                    </td>
                                  </tr>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4829</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Enterprize Year Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">10-04-2018</span><span className="date">10-12-2018</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$599.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                    </td>
                                  </tr>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4830</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Enterprize Anniversary Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">12-04-2018</span><span className="date">14-12-2018</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$399.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                    </td>
                                  </tr>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4840</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Enterprize Coverage Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">12-08-2018</span><span className="date">13-22-2018</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$99.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-danger">Cancel</span></div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="tabItem10">
                        <div className="card card-bordered card-preview">
                          <table className="table table-tranx">
                            <thead>
                              <tr className="tb-tnx-head">
                                <th className="tb-tnx-id"><span className="">#</span></th>
                                <th className="tb-tnx-info"><span className="tb-tnx-desc d-none d-sm-inline-block"><span>Bill
                                  For</span></span><span className="tb-tnx-date d-md-inline-block d-none"><span
                                    className="d-md-none">Date</span><span className="d-none d-md-block"><span>Issue
                                      Date</span><span>Due Date</span></span></span></th>
                                <th className="tb-tnx-amount"><span className="tb-tnx-total">Total</span><span
                                  className="tb-tnx-status d-none d-md-inline-block">Status</span></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4947</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Enterprize Year Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">10-05-2019</span><span className="date">10-13-2019</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$599.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-warning">Due</span></div>
                                </td>
                              </tr>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4904</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Maintenance Year Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">06-19-2019</span><span className="date">06-26-2019</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$99.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                </td>
                              </tr>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4829</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Enterprize Year Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">10-04-2018</span><span className="date">10-12-2018</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$599.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                </td>
                              </tr>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4830</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Enterprize Anniversary Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">12-04-2018</span><span className="date">14-12-2018</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$399.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                </td>
                              </tr>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4840</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Enterprize Coverage Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">12-08-2018</span><span className="date">13-22-2018</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$99.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-danger">Cancel</span></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="tab-pane" id="tabItem11">
                        <div className="row">
                          <div className="col-md-6 col-xxl-4">
                            <div className="card card-bordered card-full">
                              <div className="card-inner">
                                <div className="card-title-group mb-1">
                                  <div className="card-title">
                                    <h6 className="title">Crypto Investment</h6>
                                    <p>The investment overview of your platform.</p>
                                  </div>
                                </div>
                                <div className="invest-ov gy-2">
                                  <div className="subtitle">Currently Actived Investment</div>
                                  <div className="invest-ov-details">
                                    <div className="invest-ov-info">
                                      <div className="amount">49,395.395 <span className="currency currency-usd">USD</span></div>
                                      <div className="title">Amount</div>
                                    </div>
                                    <div className="invest-ov-stats">
                                      <div><span className="amount">56</span><span className="change up text-danger"><em
                                        className="icon ni ni-arrow-long-up"></em>1.93%</span></div>
                                      <div className="title">Plans</div>
                                    </div>
                                  </div>
                                  <div className="invest-ov-details">
                                    <div className="invest-ov-info">
                                      <div className="amount">49,395.395 <span className="currency currency-usd">USD</span></div>
                                      <div className="title">Paid Profit</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="invest-ov gy-2">
                                  <div className="subtitle">Investment in this Month</div>
                                  <div className="invest-ov-details">
                                    <div className="invest-ov-info">
                                      <div className="amount">49,395.395 <span className="currency currency-usd">USD</span></div>
                                      <div className="title">Amount</div>
                                    </div>
                                    <div className="invest-ov-stats">
                                      <div><span className="amount">23</span><span className="change down text-danger"><em
                                        className="icon ni ni-arrow-long-down"></em>1.93%</span></div>
                                      <div className="title">Plans</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-xxl-8">
                            <div className="card card-bordered card-full">
                              <table className="table table-tranx">
                                <thead>
                                  <tr className="tb-tnx-head">
                                    <th className="tb-tnx-id"><span className="">#</span></th>
                                    <th className="tb-tnx-info"><span className="tb-tnx-desc d-none d-sm-inline-block"><span>Bill ID
                                      For</span></span><span className="tb-tnx-date d-md-inline-block d-none"><span
                                        className="d-md-none">Date</span><span className="d-none d-md-block"><span>Issue
                                          Date</span><span>Due Date</span></span></span></th>
                                    <th className="tb-tnx-amount"><span className="tb-tnx-total">Total</span><span
                                      className="tb-tnx-status d-none d-md-inline-block">Status</span></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4947</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Enterprize Year Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">10-05-2019</span><span className="date">10-13-2019</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$599.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-warning">Due</span></div>
                                    </td>
                                  </tr>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4904</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Maintenance Year Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">06-19-2019</span><span className="date">06-26-2019</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$99.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                    </td>
                                  </tr>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4829</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Enterprize Year Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">10-04-2018</span><span className="date">10-12-2018</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$599.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                    </td>
                                  </tr>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4830</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Enterprize Anniversary Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">12-04-2018</span><span className="date">14-12-2018</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$399.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                    </td>
                                  </tr>
                                  <tr className="tb-tnx-item zoom_on_table">
                                    <td className="tb-tnx-id"><a href="#"><span>4840</span></a></td>
                                    <td className="tb-tnx-info">
                                      <div className="tb-tnx-desc"><span className="title">Enterprize Coverage Subscription</span></div>
                                      <div className="tb-tnx-date"><span className="date">12-08-2018</span><span className="date">13-22-2018</span>
                                      </div>
                                    </td>
                                    <td className="tb-tnx-amount">
                                      <div className="tb-tnx-total"><span className="amount">$99.00</span></div>
                                      <div className="tb-tnx-status"><span className="badge bg-danger">Cancel</span></div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="tab-pane" id="tabItem12">
                        <p>Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor
                          proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua
                          amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa
                          ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.</p>
                        <div className="card card-bordered card-preview">
                          <table className="table table-tranx">
                            <thead>
                              <tr className="tb-tnx-head">
                                <th className="tb-tnx-id"><span className="">#</span></th>
                                <th className="tb-tnx-info"><span className="tb-tnx-desc d-none d-sm-inline-block"><span>Bill
                                  For</span></span><span className="tb-tnx-date d-md-inline-block d-none"><span
                                    className="d-md-none">Date</span><span className="d-none d-md-block"><span>Issue
                                      Date</span><span>Due Date</span></span></span></th>
                                <th className="tb-tnx-amount"><span className="tb-tnx-total">Total</span><span
                                  className="tb-tnx-status d-none d-md-inline-block">Status</span></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4947</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Enterprize Year Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">10-05-2019</span><span className="date">10-13-2019</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$599.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-warning">Due</span></div>
                                </td>
                              </tr>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4904</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Maintenance Year Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">06-19-2019</span><span className="date">06-26-2019</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$99.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                </td>
                              </tr>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4829</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Enterprize Year Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">10-04-2018</span><span className="date">10-12-2018</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$599.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                </td>
                              </tr>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4830</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Enterprize Anniversary Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">12-04-2018</span><span className="date">14-12-2018</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$399.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-success">Paid</span></div>
                                </td>
                              </tr>
                              <tr className="tb-tnx-item zoom_on_table">
                                <td className="tb-tnx-id"><a href="#"><span>4840</span></a></td>
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc"><span className="title">Enterprize Coverage Subscription</span></div>
                                  <div className="tb-tnx-date"><span className="date">12-08-2018</span><span className="date">13-22-2018</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-amount">
                                  <div className="tb-tnx-total"><span className="amount">$99.00</span></div>
                                  <div className="tb-tnx-status"><span className="badge bg-danger">Cancel</span></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>


              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );

}
export default RoadMap;
