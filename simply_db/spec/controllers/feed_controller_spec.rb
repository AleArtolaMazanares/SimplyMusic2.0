describe Users::FeedsController do
    let(:valid_attributes) do
      {
        content: 'Your content here',
        date: Date.today,
        user_id: 1 # Reemplaza con un ID de usuario existente en tu contexto de prueba
      }
    end
  
      it 'renders a JSON response with the new feed' do
        # Simula la creación exitosa de un Feed
        allow_any_instance_of(Feed).to receive(:save).and_return(true)
  
        post :create, params: { feed: valid_attributes }
        expect(response).to have_http_status(:created)
      end
  
      it 'renders a JSON response with errors for the new feed' do
        # Simula la falla en la creación de un Feed
        allow_any_instance_of(Feed).to receive(:save).and_return(false)
  
        post :create, params: { feed: { content: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

  
  