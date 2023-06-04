import { FormEvent, useState } from 'react'
import './App.css'
import 'bulma/css/bulma.min.css'
import Row from './row'
import Column from './column'
import * as transcribtion from './transcribtion'
import './assets/fonts/glagolica-missal-gpg.ttf'

function App() {

  const [glagoliticText, setGlagoliticText] = useState("")
  const [cyrillicText, setCyrillicText] = useState("")
  const [glagoliticFont, setGlagoliticFont] = useState("Noto Sans Glagolitic")

  const onGlagoliticInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target: HTMLTextAreaElement = e.currentTarget
    const text = target.value
    setGlagoliticText(text)
    setCyrillicText(transcribtion.glagToCyr(text))
  }

  const onCyrillicInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target: HTMLTextAreaElement = e.currentTarget
    const text = target.value
    setCyrillicText(text)
    setGlagoliticText(transcribtion.cyrToGlag(text))
  }

  const fonts = [
    'Noto Sans Glagolitic',
    'Glagolica Missal DPG',
    'Vinodolski Zakon',
    'Shafarik',
  ]

  const fontOptions = fonts.map((font, i) => (
    <option key={i} value={font}>{font}</option>
  ))

  return (
    <>
      <Row centered>
        <Column>
          <Row centered>
            <Column narrow box>

              <div className="field">
                <label className="label">Текст на глаголице</label>
                <div className="control">
                  <textarea cols={30} rows={7}
                    className="textarea general-ta" onInput={onGlagoliticInput}
                    value={glagoliticText} 
                    style={{ fontFamily: glagoliticFont,  }}
                  ></textarea>
                </div>
              </div>

              <div className="field">
                <label className="label">Текст на кириллице</label>
                <div className="control">
                  <textarea cols={30} rows={7}
                    className="textarea general-ta" onInput={onCyrillicInput}
                    value={cyrillicText}></textarea>
                </div>
              </div>

              <div className="field">
                <label className="label">Шрифт глаголицы</label>
                <div className="control">
                  <div className="select">
                    <select 
                      value={glagoliticFont} 
                      onChange={e => setGlagoliticFont(e.currentTarget.value)}
                    >
                      {fontOptions}
                    </select>
                  </div>
                </div>
              </div>
            </Column>
          </Row>
        </Column>
      </Row>
    </>
  )
}

export default App
