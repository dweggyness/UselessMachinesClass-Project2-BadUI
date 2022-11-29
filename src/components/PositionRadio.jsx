import React, {useState, useRef, useEffect} from 'react';
import styles from '../styles/components/positionRadio.module.css';

export function PositionRadio(props) {
  const { onChange, value } = props;

  const _onChange = (e) => {
    const column = e.target.name;
    const val = e.target.value;

    if (column === "seniority") {
      onChange([val, value[1], value[2]])
    } else if (column === "department") {
      onChange([value[0], val, value[2]])
    } else if (column === "role") {
      onChange([value[0], value[1], val])
    }
  }

  return (
    <>
      <section className={styles.roleRadioContainer}>

        <label>
          <div className={styles.radioColumn}>
            <div>
              <input type="radio" onChange={_onChange} name="seniority" value="Intern" checked={value[0] === "Intern"} />
              <label htmlFor="seniority">Intern</label>
            </div>
            <div>
              <input type="radio" onChange={_onChange} name="seniority" value="Junior" checked={value[0] === "Junior"} />
              <label htmlFor="seniority">Junior</label>
            </div>
            <div>
              <input type="radio" name="seniority" value="Senior" onChange={_onChange} checked={value[0] === "Senior"} />
              <label htmlFor="seniority">Senior</label>
            </div>
            <div>
              <input type="radio" name="seniority" value="Chief" onChange={_onChange} checked={value[0] === "Chief"}/>
              <label htmlFor="seniority">Chief Of</label>
            </div>
          </div>
        </label>

        <label>
          <div className={styles.radioColumn}>
            <div>
              <input type="radio" onChange={_onChange} id="Frontend" name="department" value="Frontend" checked={value[1] === "Frontend"} />
              <label htmlFor="department">Frontend</label>
            </div>
            <div>
              <input type="radio" id="Backend" name="department" value="Backend" onChange={_onChange} checked={value[1] === "Backend"}/>
              <label htmlFor="department">Backend</label>
            </div>
            <div>
              <input type="radio" id="Marketing" name="department" value="Marketing" onChange={_onChange} checked={value[1] === "Marketing"}/>
              <label htmlFor="department">Marketing</label>
            </div>
            <div>
              <input type="radio" id="DevOps" name="department" value="DevOps" onChange={_onChange} checked={value[1] === "DevOps"}/>
              <label htmlFor="department">DevOps</label>
            </div>
          </div>
        </label>

        <label>
          <div className={styles.radioColumn}>
            <div>
              <input type="radio" id="Engineering" name="role" value="Engineers" onChange={_onChange} checked={value[2] === "Engineers"}/>
              <label htmlFor="role">Engineers</label>
            </div>
            <div>
              <input type="radio" id="Development" name="role" value="Developers" onChange={_onChange} checked={value[2] === "Developers"}/>
              <label htmlFor="role">Developers</label>
            </div>
            <div>
              <input type="radio" id="Designer" name="role" value="Designer" onChange={_onChange} checked={value[2] === "Designer"}/>
              <label htmlFor="role">Designer</label>
            </div>
            <div>
              <input type="radio" id="User Experience" name="role" value="Manager" onChange={_onChange} checked={value[2] === "Manager"}/>
              <label htmlFor="role">Manager</label>
            </div>
          </div>
        </label>

      </section>
    </>
  )
}

const memoComponent = React.memo(PositionRadio);
export default memoComponent;