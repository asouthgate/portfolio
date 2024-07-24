import { React, useState } from 'react';
import './search.css';
import { getEvent } from '../api/requests'

/**
 * Display response text (formatted JSON)
 * 
 * @param {string} responseValue The response value string to be displayed.
 */
const ResponseText = ({responseValue}) => { 
  return (
      <div className="d-flex flex-column align-items-center">
        <h1>
          EVENT
        </h1>
        <div className="response-text">
          <pre>{responseValue}</pre>
        </div>
      </div>
  )
}

/**
 * Main search component.
 * 
 * This component provides forms for NGDB API queries and visualising responses.
 * Currently, this is just a visual demonstration, and does not provide real functionality.
 */
const AdvancedSearch = () => {
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
              SEARCH
            </h1>
            <div className="search-forms">
              <form onSubmit={handleQuerySubmit}>
                <div className="row align-items-center">
                  <label className="col-md-4 d-flex justify-content-end">
                    Event ID:
                  </label>
                    <input className="col-md-4"
                      type="text"
                      value={QueryInputValue}
                      onChange={handleQueryFormChange}
                      defaultValue="Default Value"
                    />
                  <div className="col-md-4"/>
                </div>
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
            {responseValue ? <ResponseText responseValue={responseValue} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
