import React, { Component } from 'react'
import styles from './styles.js'
import Logo from './Logo.js'
import {Link} from 'react-router-dom'
import superagent from 'superagent'
import update from 'immutability-helper'


class Menubar extends Component {
  constructor(){
    super()
    this.handleTopicClick = this.handleTopicClick.bind(this);
    this.resetTopic = this.resetTopic.bind(this);
    this.handleFilterToggleClick = this.handleFilterToggleClick.bind(this);
    this.state = {
      topicList: []
    }
  }

  componentDidMount(){
    //get topics
    superagent
      .get('/api/topic')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          console.log(err)
          return
        }

        let results = response.body.results.reverse();

        this.setState({
          topicList: results
        })

      })
  }

  handleTopicClick(e){
    e.preventDefault()
    let topic = e.currentTarget.textContent

    if(topic == 'Simply Interesting'){
      topic = 'none'
    }

    this.props.updateTopic(topic)
  }

  resetTopic(){
    this.props.updateTopic('')
  }

  handleFilterToggleClick(){
    this.props.toggleFilter()
  }


  render(){

    const topicList = this.state.topicList.map((topic, i) => {
      return (
        <Link
          key={i.toString()}
          style={this.props.currentTopic == topic.name ? styles.menubar.link.active : styles.menubar.link}
          to={'/'}
          onClick={this.handleTopicClick}
        >
          {topic.name}
        </Link>
      )
    })

		return (
			<div id="menubar-container">

        <Logo/>

        {/* Toggle Button */}
        <span
          id="toggle-filter-btn"
          style={this.props.sidebarIsOpen ? styles.menubar.toggleFilterButton.hide : styles.menubar.toggleFilterButton.show }
          onClick={this.handleFilterToggleClick}
        >
          {this.props.sidebarIsOpen ? 'X' : 'Filter'}
        </span>


        <div id="menubar-links-container">
          {/* <a
            id="sign-up-btn"
            href={'/auth/google'}
            onClick={this.resetTopic}>
              Get started
          </a> */}

          <Link
            style={styles.menubar.link}
            to={'/'}
            onClick={this.resetTopic}>
              Latest
          </Link>

          {topicList}


          <Link
            style={styles.menubar.link}
            to={'/'}
            onClick={this.handleTopicClick}>
              Simply Interesting
          </Link>



        </div>

			</div>
		)
	}
}

export default Menubar