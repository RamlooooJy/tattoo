export const getBackgroundImage = (src: string) => {
  const style = {
    '--local-background': `url(${src})`,
  } as React.CSSProperties

  return { style, backgroundImageClassName: 'backgroundImage' }
}
