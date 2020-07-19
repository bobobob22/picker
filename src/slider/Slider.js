import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import merge from 'lodash/merge'

import tinycolor from 'tinycolor2'


import { Hue } from '../common/Hue'
import { ColorWrap } from '../common/ColorWrap'
import SliderSwatches from './SliderSwatches'
import SliderPointer from './SliderPointer'

export const Slider = ({ wasUpdated, color, hsl, onChange, pointer,
  styles: passedStyles = {}, className = '' }) => {

  // console.log("COLOR", color);
  // const tinyColorAdapter = tinycolor(color.background);
  //
  // const tinyHsl = tinyColorAdapter.toHsl();
  // console.log('tiny', tinyHsl)
  //
  // onChange({
  //   a: 1,
  //   h: tinyHsl.l,
  //   l: 0.5,
  //   s: 1,
  // })


  useEffect(() => {

    console.log('AA')
    console.log("COLOR", color);
    const tinyColorAdapter = tinycolor(color.background);

    const tinyHsl = tinyColorAdapter.toHsl();
    console.log('tiny', tinyHsl)

    onChange({
      a: 1,
      h: tinyHsl.h,
      l: 0.5,
      s: 1,
    })

  }, [wasUpdated])


  const styles = reactCSS(merge({
    'default': {
      hue: {
        height: '12px',
        position: 'relative',
      },
      Hue: {
        radius: '2px',
      },
    },
  }, passedStyles))


  const handleChange = data => onChange({ a: 1, h: data.h, l: 0.5, s: 1 })

  return (
    <div style={ styles.wrap || {} } className={ `slider-picker ${ className }` }>
      <div style={ styles.hue }>
        <Hue
          style={ styles.Hue }
          hsl={ hsl }
          pointer={ pointer }
          onChange={ handleChange }
        />
      </div>
      <div style={ styles.swatches }>
        <SliderSwatches hsl={ hsl } onClick={ onChange } />
      </div>

      {/*<div>*/}

      {/*  <div style={{*/}
      {/*    width: '30px',*/}
      {/*    height: '30px',*/}
      {/*    backgroundColor: inputValue*/}
      {/*  }}*/}
      {/*  >*/}
      {/*</div>*/}

      {/*  <input onChange={handleInputChange} />*/}

      {/*</div>*/}
    </div>
  )
}

Slider.propTypes = {
  styles: PropTypes.object,
}
Slider.defaultProps = {
  pointer: SliderPointer,
  styles: {},
}

export default ColorWrap(Slider)
