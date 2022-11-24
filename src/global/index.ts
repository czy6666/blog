import { App } from 'vue'
import registerElement from './register-element'
import registerAntD from './register-antD'

export function registerApp(app: App): void {
    registerElement(app)
    registerAntD(app)
}
