export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary',
      secondary: 'secondary',
    },

    modal: {
      slots: {
        overlay: 'bg-neutral-900/60!',
        content: 'ring-primary-700! bg-primary-900 divide-primary-700',
        title: 'text-2xl text-primary-300',
        close: 'text-primary-300 cursor-pointer hover:text-primary hover:bg-transparent',
      }
    },

    pageFeature: {
      slots: {
        leadingIcon: ' text-primary-300',
        title: 'text-xs font-bold uppercase tracking-widest text-primary-300',
        description: 'mb-8 text-2xl font-black uppercase italic text-white'
      }
    }
  }
})
