import "./App.css";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import ShareLink from "react-facebook-share-link";
import { WhatsappIcon } from "react-share";
import shareFacebook from "./images/facebook-share-button.svg";
import dr from "./images/dr.jpeg";
function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});
  const [counter, setCounter] = useState("");
  const [sent, setSent] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    const errors = {};
    if (!city) errors.city = "נא בחר/י עיר";
    if (!name || !name.split(" ").join("")) errors.name = "נא מלא/י שם";
    if (phone.length != 10) errors.phone = "מספר טלפון צריך להכיל 10 ספרות";
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const campaign = urlParams.get("campaign");
    const source = urlParams.get("source");
    const medium = urlParams.get("medium");
    const data = {
      fullname: name,
      phone: phone,
      city: city,
      source: source,
      campaign,
      medium,
    };
    db.ref("petitons").push(data);
    db.ref("counter").set(counter + 1);
    setName("");
    setPhone("");
    setCity("");
    setSent(true);
  }
  useEffect(() => {
    db.ref().on("value", (snapshot) => {
      const data = snapshot.val();
      setCounter(data.counter);
    });
  }, []);

  return (
    <div className="app">
      <div className="text">
        <h1>עצומה!</h1>
        <h2> מחזירים את ד"ר הרינג לטירת כרמל!</h2>
        <p>
          תושבי טירת כרמל והסביבה חותמים על העצומה בקריאה להחזיר את ד"ר אליעזר
          הרינג האהוב בחזרה לקופת חולים כללית בטירת כרמל!
        </p>
      </div>
      <img
        style={{ width: "80%", maxWidth: 300, paddingBottom: 20 }}
        src={dr}
        alt="dr"
      />
      <form onSubmit={handleSubmit}>
        <div className="helper">
          <label for="fullname">שם מלא:</label>
          <input
            id="fullname"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="errors">{errors.name}</p>
        </div>
        <div className="helper">
          <label for="phone">טלפון:</label>
          <input
            id="phone"
            type="tel"
            pattern="[0-9()#&+*-=.]+"
            title="מספרים בלבד"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="errors">{errors.phone}</p>
        </div>
        <div className="helper">
          <label for="city">עיר:</label>
          <select
            id="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value={false}>בחר/י</option>
            <option value="טירת כרמל">טירת כרמל</option>
            <option value="עתלית וחוף הכרמל">עתלית וחוף הכרמל</option>
            <option value="חיפה/אחר">חיפה / אחר</option>
          </select>
          <p className="errors">{errors.city}</p>
        </div>
        <p>עד כה נאספו {counter} חתימות</p>
        <button disabled={sent} id="submit" type="submit">
          שלח
        </button>
        {sent && <h3>תודה שחתמתם!</h3>}
      </form>
      <div style={{ paddingTop: 20 }} className="share">
        <a
          href='whatsapp://send?text=מחזירים את ד"ר הרינג לטירת כרמל!
חתמו עכשיו על העצומה>>https://atzuma2021.web.app/'
        >
          <WhatsappIcon size={50} round={true} />
        </a>
        <ShareLink link="https://atzuma2021.web.app/">
          {(link) => (
            <a href={link} target="_blank" rel="noreferrer">
              <img
                style={{ width: 100, paddingRight: 20 }}
                src={shareFacebook}
                alt="share"
              />
            </a>
          )}
        </ShareLink>
      </div>
    </div>
  );
}
export default App;
