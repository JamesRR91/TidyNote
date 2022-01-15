import './Footer.css';

function Footer() {
  return (
    <div id='footer-container'>
      <div className='name-and-link'>
        <p id='name'>Andrew Tran</p>
        <div id='links'>
          <div id='github'>
            <a className='gl-links' href='https://github.com/andrwtran'>
              <img
                className='links-logo-1'
                src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                alt='Github logo'
              />
            </a>
          </div>
        </div>
      </div>
      <div className='name-and-link'>
        <p id='name'>James Roberts</p>
        <div id='links'>
          <div id='github'>
            <a className='gl-links' href='https://github.com/JamesRR91'>
              <img
                className='links-logo-2'
                src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                alt='Github logo'
              />
            </a>
          </div>
        </div>
      </div>
      <div className='name-and-link'>
        <p id='name'>Nawal Ahmed</p>
        <div id='links'>
          <div id='github'>
            <a className='gl-links' href='https://github.com/NawalJAhmed'>
              <img
                className='links-logo-3'
                src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                alt='Github logo'
              />
            </a>
          </div>
        </div>
      </div>
      <div className='name-and-link'>
        <p id='name'>Sumit Dey</p>
        <div id='links'>
          <div id='github'>
            <a className='gl-links' href='https://github.com/Sumit-dey'>
              <img
                className='links-logo-4'
                src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                alt='Github logo'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
