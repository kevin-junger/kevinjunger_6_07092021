import Image from './Image.js'
import Video from './Video.js'

export default class MediaFactory {
  constructor(type, data) {
    switch (type) {
      case 'image':
        return new Image(data)
      case 'video':
        return new Video(data)
    }
  }
}
