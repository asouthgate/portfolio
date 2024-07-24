import { React, useState } from 'react';
import './search.css';

const About = () => {
  const [QueryInputValue, setQueryInputValue] = useState('');
  const [responseValue, setResponseValue] = useState('');

  /**
   * Handles changes in the input value in the API query form.
   * 
   * @param {Event} event
   */
  const handleQueryFormChange = (event) => {
    setQueryInputValue(event.target.value);
    setResponseValue("");
  };

  /**
   * Handles the query submit button.
   * 
   * Again, this is just a mock. To be replaced with implementation.
   * @param {Event} event
   */
  const handleQuerySubmit = async (event) => {
    event.preventDefault(); // Prevents a full page reload

    let e = await getEvent(QueryInputValue);
    console.log(e);

    setResponseValue(JSON.stringify(e, null, 2));
    console.log("Submitted a query.")
  };

  return (
    <div id="search-container-col">
      <div id="search-container">
        <div className="row">
          <div className="col-md-12">
            <h1>
              ADVANCED SEARCH
            </h1>
            <div className="search-forms">
              <form onSubmit={handleQuerySubmit}>

                <div className="row justify-content-center">
                  <div className="help-button col-md-4">
                  </div>
                  <div className="submit-button col-md-4 text-center">
                    <button type="submit">Send</button>
                  </div>
                  <div className="col-md-4"/>
                </div>
               </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
