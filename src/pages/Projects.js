import React, {Component} from 'react';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Projects extends React.Component{
   render(){
       return (
           <div>
     <div class="nk-app-root">
       
       <div class="nk-main ">
 
 
 <Menu/>
 
 
 
           <div class="nk-wrap ">
 


<Header/>

     <div class="nk-content ">
                    <div class="container-fluid">
                        <div class="nk-content-inner">
                            <div class="nk-content-body">
                                <div class="nk-block-head nk-block-head-sm">
                                    <div class="nk-block-between">
                                        <div class="nk-block-head-content">
                                            <h3 class="nk-block-title page-title">Inrx Ecosystem - Project Development</h3>
                                            <div class="nk-block-des text-soft">
                                                <p>Project Board</p>
                                            </div>
                                        </div>
                                        <div class="nk-block-head-content">
                                            <div class="toggle-wrap nk-block-tools-toggle">
                                                <a href="#" class="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em class="icon ni ni-menu-alt-r"></em></a>
                                                <div class="toggle-expand-content" data-content="pageMenu">
                                                    <ul class="nk-block-tools g-3">
                                                        <li><a href="#" class="btn btn-white btn-outline-light"><em class="icon ni ni-plus"></em><span>Add Task</span></a></li>
                                                        <li><a href="#" class="btn btn-primary"><em class="icon ni ni-plus"></em><span>Add Board</span></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-block">
                                    <div id="kanban" class="nk-kanban"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>





</div>



</div>
</div>        
           </div>
       )
   }
}
export default Projects

