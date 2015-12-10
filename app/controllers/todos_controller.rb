class TodosController < ApplicationController
  def index
    @todos = Todo.all
    respond_to do |format|
      format.html
      format.json { render json: @todos, each_serializer: TodoSerializer }
    end
  end
end
