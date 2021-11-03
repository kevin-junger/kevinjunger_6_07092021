import Image from './Image.js'
import Video from './Video.js'

/**
 * Media
 * Factory class - creates two types of Media: Image and Video
 */

export default class Media {
  constructor(data, type) {
    if(type === 'video') {
      return new Video(data)
    } else {
      return new Image(data)
    }
  }
}
