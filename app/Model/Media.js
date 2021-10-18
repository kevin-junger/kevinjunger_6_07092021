import Image from './Image.js'
import Video from './Video.js'

/**
 * Media
 * Factory class - creates two types of Media: Image and Video
 */

export default class Media {
  constructor(data, type) {
    switch (type) {
      case 'image':
        return new Image(data)
      case 'video':
        return new Video(data)
      default:
        return undefined
    }
  }
}
