import React from 'react'
import './InfoDisplay.css'

//display formatted json data
export default function InfoDisplay({ data = {} }) {
    if (!data) {
        return null
    }
    if(!data.Data.hasOwnProperty('VirtualAccFlag')) {
        return (
            <div className="infoContainer">
                <div className="formattedData">
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </div>
            </div>
        )
    } else {
      console.log(data.Data)
        return (
          <div>
            <div className="wrapper">
              <div className="header-text"> ROLLOVER </div>
                <div className="table">
                    <div className="row header">
                      <div className="cell">
                        Tag Name
                      </div>
                      <div className="cell">
                        Principal Amount
                      </div>
                      <div className="cell">
                        Currency
                      </div>
                      <div className="cell">
                        Auto Debit Date
                      </div>
                      <div className="cell">
                        Due Date
                      </div>
                      <div className="cell">
                        Interest Earned
                      </div>
                    </div>
                     {data.Data.VirtualAccounts.map(( listValue, index ) => {
                      if(listValue.VirtualAccType == 'ROLLOVER') {
                        return (
                          <div className="row">
                            <div className="cell" data-title="Debit Data">
                              {listValue.TagName}
                            </div>
                            <div className="cell" data-title="Age">
                              {listValue.PrincipalAmount}
                            </div>
                            <div className="cell" data-title="Occupation">
                              {listValue.Currency}
                            </div>
                            <div className="cell" data-title="Location">
                              {listValue.AutoDebitDate.split('T')[0]}
                            </div>
                            <div className="cell" data-title="Location">
                              {listValue.DueDate.split('T')[0]}
                            </div>
                            <div className="cell" data-title="Location">
                              {listValue.Interest}
                            </div>
                          </div>
                        );
                      }
                    })}          
                </div>
            </div>

            <div className="wrapper">
              <div className="header-text"> SAVINGS </div>
                <div className="table">
                    <div className="row header">
                      <div className="cell">
                        Tag Name
                      </div>
                      <div className="cell">
                        Currency
                      </div>
                      <div className="cell">
                        Start Date
                      </div>
                      <div className="cell">
                        Maturity Date
                      </div>
                      <div className="cell">
                        Amount on Maturity
                      </div>
                      <div className="cell">
                        Term
                      </div>
                    </div>
                     {data.Data.VirtualAccounts.map(( listValue, index ) => {
                      if(listValue.VirtualAccType == 'SAVINGS') {
                        return (
                          <div className="row">
                            <div className="cell" data-title="Debit Data">
                              {listValue.TagName}
                            </div>
                            <div className="cell" data-title="Age">
                              {listValue.Currency}
                            </div>
                            <div className="cell" data-title="Occupation">
                              {listValue.AutoDebitDate.split('T')[0]}
                            </div>
                            <div className="cell" data-title="Location">
                              {listValue.DueDate.split('T')[0]}
                            </div>
                            <div className="cell-maturity" data-title="Location">
                              {listValue.Interest}
                            </div>
                            <div className="cell" data-title="Location">
                              {listValue.Term}
                            </div>
                          </div>
                        );
                      }
                    })}          
                </div>
            </div>
          </div>
        )
    }
}

