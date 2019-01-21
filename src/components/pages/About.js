import React, { Component } from 'react';
import Card from './../Card';

class About extends Component {
    render() {
        return(
          <div className="container-fluid">
          <div className="row bg-dark text-light">
          <h1 className="ml-2 mr-2">Welcome to Dan's Portfolio!</h1>
          </div>
          <div className="bg-dark text-light row">
            <p className="ml-2 mr-2">The intention of this web app is to show what I'm capable of.</p>
          </div>
          <div className="bg-dark text-light row">
            <p className="ml-2 mr-2">This particular version of the site was built in React, there's also a Vue version!</p>
          </div>
          <div className="bg-secondary row">
            <h2 className="ml-2 mr-2">Helpful Links</h2>
          </div>
          <div className="bg-secondary row">
            <div className="col d-flex align-items-stretch justify-content-center">
              <Card title="Here's a card!" 
              desc="Maybe I'll get inspired if I keep doing this stuff!" 
              url="https://www.google.ca" 
              buttonText="Google!"/>
            </div>
            <div className="col d-flex align-items-stretch justify-content-center">
              <Card title="Another Card!" 
              desc="This is getting really fun! And I'm building something really cool!" 
              url="https://www.ddorsey.ca" 
              buttonText="My Site!"/>
            </div>
            <div className="col d-flex align-items-stretch justify-content-center">
              <Card title="A Third Card!" 
              desc="Stuff is about to really take off from here!" 
              url="https://www.getbootstrap.com" 
              buttonText="Bootstrap Docs!"/>
            </div>
          </div>
          </div>
        )
    }
}

export default About;