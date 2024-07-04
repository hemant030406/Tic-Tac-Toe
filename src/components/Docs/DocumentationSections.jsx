import React from 'react';
import CodeSnippet from './CodeSnippet';
import HowToPlaySection from './HowToPlay';

const DocumentationSections = () => {
  return (
    <main className="documentation">
      <HowToPlaySection/>
      {/* <section id="setup" className="section">
        <h2>Setup and Installation</h2>
        <p>Instructions for setting up the Django backend and React frontend.</p>
        <CodeSnippet language="bash">
          {`
          # Clone the repository
          git clone https://github.com/your/repository.git

          # Install backend dependencies
          cd backend/
          pip install -r requirements.txt

          # Install frontend dependencies
          cd ../frontend/
          npm install
          `}
        </CodeSnippet>
      </section>
      
      <section id="backend" className="section">
        <h2>Backend Implementation</h2>
        <p>Details about Django models, views, and WebSocket integration.</p>
        <CodeSnippet language="python">
          {`
          # Django models example
          class User(models.Model):
              username = models.CharField(max_length=100)
              # Other fields...

          # Django views example
          def index(request):
              return render(request, 'index.html')

          # Django WebSocket consumer example
          class GameConsumer(JsonWebsocketConsumer):
              def connect(self):
                  # WebSocket connection logic
                  pass
          `}
        </CodeSnippet>
      </section> */}


      {/* Other sections like Frontend, Gameplay Features, Chat Functionality, Deployment, Testing, Future Enhancements */}
    </main>
  );
}

export default DocumentationSections;
