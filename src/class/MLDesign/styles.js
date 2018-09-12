class Styles {
  getStyles() {
    const styles = theme => ({
      root: this.createRoot(theme),
      paper: this.createPaper(theme)
    });

    return styles;
  }

  createRoot(theme) {
    return {
        flexGrow: 1,
        backgroundColor: '#2ecc71',
        marginTop: '40px',
      }
  }

  createPaper(theme) {
      return {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary
      }
  }

}

export default new Styles();
