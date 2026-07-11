export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary',
      secondary: 'secondary',
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
