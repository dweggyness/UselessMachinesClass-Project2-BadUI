import React, {useState, useRef, useEffect} from 'react';
import styles from '../styles/components/birthdayDropdown.module.css';

export function BirthdayDropdown(props) {
  const { children, onChange, value = [1901, 0, 1]} = props;

  const curDay = value[2]
  const curMonth = value[1];
  const curYear = value[0];

  const dropdownMonthYearObj = new Date(curYear, curMonth);

  const onChangeDay = (e) => {
    const newDay = e.target.value;

    onChange([curYear, curMonth, newDay]);
  }

  const onChangeMonthYear = (e) => {
    const newDate = new Date(e.target.value);

    onChange([newDate.getFullYear(), newDate.getMonth(), curDay]);
  }

  return (
    <>
      <section className={styles.dropdownContainer}>
        <label>
          Day
          <select value={curDay} onChange={onChangeDay} name="birthdaysDay" id="birthdaysDay">
            {[...Array(31)].map((x, i) => {
              return (
                <option key={i} value={i+1}>{i+1}</option>
              )
            })}
          </select>
        </label>

        <label>
          Month/Year
          <select value={dropdownMonthYearObj} onChange={onChangeMonthYear} name="birthdaysMonth" id="birthdaysMonth">
            {[...Array(118)].map((x, iYear) => 
              [...Array(12)].map((x, iMonth) => {
                const date = new Date(1901 + iYear, iMonth);
                const dateString = date.toLocaleString('en-GB', { year: 'numeric', month: 'long' });
                return (
                  <option key={dateString} value={date}>{dateString}</option>
                )
              })
            )}
          </select>
        </label>
      </section>
    </>
  )
}

const memoComponent = React.memo(BirthdayDropdown);
export default memoComponent;