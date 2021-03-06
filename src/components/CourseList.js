import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful';

import Course from '../components/Course'


const SPACE_ID = 'cajq31s578q6'
const ACCESS_TOKEN = 'RDQl05qsAE2PWeOIOzSQehRWQ7xpYr-Yp7c5acK2rCo'
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})

class CoursesList extends React.Component {
  constructor(){
    super()
    this.state = {
      courses: [],
      searchString: ''
    }
  }

  getCourses = () => {
    client.getEntries({
      content_type: 'learningMaterialUi',
      query: this.state.searchString
    })
    .then((response) => {
      this.setState({courses: response.items})
      console.log(this.state.courses)
    })
    .catch((error) => {
      console.log("Error occurred while fetching Entries")
      console.error(error)
    })
  }

  onChange = e => {
    console.log('Search changed ...' + e.target.value);
    if (e.target.value) {
      this.setState({
        searchString: e.target.value
      })
    } else {
        this.setState({
          searchString: ''
        })
      }
      this.getCourses()
    }


  render () {
    return (
      <div>
      { this.state.courses ? (
        <div>
          <TextField style={{padding: 24}}
            id="searchInput"
            placeholder="Search for Courses"
            margin="normal"
            onChange={this.onChange}
            />
            <Grid container spacing={24} style={{padding: 24}}>
            { this.state.courses.map(currentCourse => (
              <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Course course={currentCourse} />
              </Grid>
            ))}
            </Grid>
        </div>
      ) : "No courses found" }
      </div>
    )
  }
}
export default CoursesList;
