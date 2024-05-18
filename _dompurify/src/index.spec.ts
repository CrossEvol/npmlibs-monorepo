import DOMPurify from 'isomorphic-dompurify'

DOMPurify.sanitize('<img src=x onerror=alert(1)//>') // becomes <img src="x">
DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>') // becomes <svg><g></g></svg>
DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>') // becomes <p>abc</p>
DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">') // becomes <math><mi></mi></math>
DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>') // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>') // becomes <ul><li><a href="//google.com">click</a></li></ul>

describe('test', () => {
  test('sanitize', async () => {
    expect(DOMPurify.sanitize('<img src=x onerror=alert(1)//>')).toEqual(
      '<img src="x">',
    )
    expect(DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>')).toEqual(
      '<svg><g></g></svg>',
    )
    expect(
      DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'),
    ).toEqual('<p>abc</p>')
    expect(
      DOMPurify.sanitize(
        '<math><mi//xlink:href="data:x,<script>alert(4)</script>">',
      ),
    ).toEqual('<math><mi></mi></math>')
    expect(DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>')).toEqual(
      '<table><tbody><tr><td>HELLO</td></tr></tbody></table>',
    )
    expect(
      DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>'),
    ).toEqual('<ul><li><a href="//google.com">click</a></li></ul>')
  })
})
