class CreateBlacklistTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :blacklist_tokens do |t|
      t.string :token

      t.timestamps
    end
    add_index :blacklist_tokens, :token
  end
end
