

import React, { Component } from "react";
import "./ContentCard.css";
import Proptypes from 'prop-types'
class ContentCard extends Component {
  static Proptypes = {

  }
  render() {
      const {title,bgcolor,mbgcolor,value,bgimage,cardname,...rest} = this.props;
      const styles = {
         backgroundColor:bgcolor,
        //  backgroundImage:
      }
      const mstyles = {
        backgroundColor:mbgcolor,
          opacity:0.7,
          backgroundImage:`url("${bgimage} ")`,
          backgroundRepeat:"no-repeat"
      }
    return(
        <div className="content-card" style={mstyles} {...rest}>
           <div className="card-title" style={styles}>
              {title}
           </div>
           <div className="card-content">
            {cardname}
           </div>
        </div>
    )
     
  }
}

export default ContentCard;
