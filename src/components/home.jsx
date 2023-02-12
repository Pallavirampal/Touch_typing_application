import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import styles from "../CSS/home.module.css";

const NUMB_OF_WORDS = 200;
const SECONDS = 300;

export default function Home() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentcharIndex, setCurrentCharIndex] = useState(-1);
  const [currentchar, setCurrentChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status == "started") {
      textInput.current.focus();
    }
  }, [status]);
  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  function start() {
    if (status == "finished") {
      setWords(generateWords());
      setCorrect(0);
      setIncorrect(0);
      setCurrentWordIndex(0);
    }
    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setCurrentInput("");
            return SECONDS;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }

  function handleKeyDown({ keyCode, key }) {
    if (keyCode === 32) {
      //32 keycode  for spacebar
      checkMatch();
      setCurrentInput("");
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(-1);
    } else {
      setCurrentCharIndex(currentcharIndex + 1);
      setCurrentChar(key);
    }
  }

  function checkMatch() {
    const Wordtocompare = words[currentWordIndex];
    const doesitmatch = Wordtocompare === currentInput.trim();
    if (doesitmatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  function getcharclass(wordIdx, charIdx, char) {
    if (
      wordIdx === currentWordIndex &&
      charIdx === currentcharIndex &&
      currentchar &&
      status !== "finished"
    ) {
      if (char === currentchar) {
        return "has-background-success";
      } else {
        return "has-background-danger";
      }
    } else {
      return " ";
    }
  }

 
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.right}>
            <img
              src="https://www.readandspell.com/sites/default/files//blog/HowToImproveTypingSpeed_0.jpg"
              alt=""
            />
          </div>
          <div className={styles.mid}>
            <h1>Touch Typing Application</h1>
          </div>
          <div className={styles.left}>
            <ul>
              {/* <li>Login</li>
              <li>Signup</li> */}
              <li> Timer : {countDown} Seconds</li>
            </ul>
          </div>
        </div>
        <div className={styles.typing}>
          <input
            className={styles.input1}
            type="text"
            ref={textInput}
            disabled={status !== "started"}
            value={currentInput}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCurrentInput(e.target.value)}
          />
          <input
            className={styles.input2}
            type="button"
            value="start"
            onClick={start}
          />
          <p className={styles.start}>Click on start </p>
          {status == "started" && (
            <>
              <div className={styles.input3}>
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span className={getcharclass(i, idx, char)} key={idx}>
                          {char}
                        </span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
              <div className={styles.footer}>
                <div className={styles.wordspermin}>
                  <p> Words in 5 minute {correct}</p>
                </div>
                <div className={styles.accur}>
                  <p>
                    Accuracy{" "}
                    {Math.round((correct / (correct + incorrect)) * 100)}%
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        {status == "finished" && (
          <div className={styles.footer}>
            <div className={styles.wordspermin}>
              <p> Words in 5 minute {correct}</p>
            </div>
            <div className={styles.accur}>
              <p>
                Accuracy {Math.round((correct / (correct + incorrect)) * 100)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
