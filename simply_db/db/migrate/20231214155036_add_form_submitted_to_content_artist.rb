class AddFormSubmittedToContentArtist < ActiveRecord::Migration[7.0]
  def change
    add_column :content_artists, :form_submitted, :boolean, default: false
  end
end
